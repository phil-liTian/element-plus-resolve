<template>
  <div ref="container" class="lt-image" :style="$attrs.style">
    <!-- 正在加载中 -->
    <slot v-if="loading" name="placeholder">
      <div class="lt-image__placeholder"></div>
    </slot>
    <!-- 加载错误 -->
    <slot v-else-if="hasLoadError" name="error">
      <div class="lt-image__error"></div>
    </slot>
    <!-- 图片 -->
    <img
      v-else
      v-bind="attrs"
      :class="[
        'lt-image__inner',
        {
          'lt-image__inner--center': alignCenter,
          'lt-image__preview': preview,
        },
      ]"
      :src="src"
      :style="imageStyle"
      @click="clickHandler"
    />

    <!-- 图片预览 -->
    <teleport to="body" :disabled="!appendToBody">
      <template v-if="preview">
        <image-viewer
          v-if="showViewer"
          :urlList="previewSrcList"
          :hide-on-click-modal="hideOnClickModal"
          @close="closeViewer"
        >
        </image-viewer>
      </template>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
} from "@vue/runtime-core";
import { props } from "./props";
import useAttrs from "../hooks/use-attrs";
import { isString } from "@vue/shared";
import { getScrollContainer, isInContainer, on, off } from "@u/dom.ts";
import { throttle } from "lodash-es";
import ImageViewer from "./imageViewer.vue";

// 判断是否支持objectFit属性
const isSupportObjectFit = () =>
  document.documentElement.style.objectFit !== undefined;
// 判断是否是element元素
const isHtmlEle = (e) => e && e.nodeType === 1;

const ObjectFit = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  SCALE_DOWN: "scale_down",
};

let prevOverflow = "";

export default defineComponent({
  name: "LtImage",
  props,
  emits: ["error"],
  components: {
    ImageViewer,
  },
  setup(props, { emit }) {
    const attrs = useAttrs();
    const loading = ref(true); // 正在加载
    const hasLoadError = ref(false); // 加载错误
    const showViewer = ref(false); // 是否展示预览
    const imgWidth = ref(0);
    const imgHeight = ref(0);
    const container = ref<HTMLElement | null>(null);

    let _scrollContainer = null;
    let _lazyLoadHandler = null;

    const imageStyle = computed(() => {
      const { fit } = props;
      if (fit) {
        return isSupportObjectFit()
          ? { "object-fit": fit }
          : getImageStyle(fit);
      }
      return {};
    });

    // 兼容处理不支持object-fit的情况
    const getImageStyle = (fit) => {
      const imageWidth = imgWidth.value;
      const imageHeight = imgHeight.value;
      if (!container.value) return {};
      const { clientWidth: containerWidth, clientHeight: containerHeight } =
        container.value;

      if (!imageHeight || !imageWidth || !containerWidth || !containerHeight)
        return {};

      // 图片的宽高比
      const imageAspectRatio = imageWidth / imageHeight;
      // 容器的宽高比
      const containerAspectRatio = containerWidth / containerHeight;

      // 图片尺寸小于容器尺寸
      if (fit === ObjectFit.SCALE_DOWN) {
        const smaller =
          imageHeight < containerHeight && imageWidth < containerWidth;
        fit = smaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
      }

      switch (fit) {
        // 保存原有比例
        case ObjectFit.NONE: {
          return { width: "auto", height: "auto" };
        }
        // 短边与容器大小一致，长边等比缩放
        case ObjectFit.CONTAIN: {
          return imageAspectRatio < containerAspectRatio
            ? { width: "auto" }
            : { height: "auto" };
        }
        case ObjectFit.COVER: {
          return imageAspectRatio > containerAspectRatio
            ? { height: "auto" }
            : { width: "auto" };
        }
        default:
          return {};
      }
    };

    // 居中
    const alignCenter = computed(() => {
      const { fit } = props;
      return !isSupportObjectFit() && fit !== ObjectFit.FILL;
    });

    // 是否可预览
    const preview = computed(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });

    // 点击图片，查看预览
    const clickHandler = () => {
      if (!preview.value) return;
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showViewer.value = true;
    };

    // 关闭图片预览
    const closeViewer = () => {
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
    };

    // 加载图片
    const loadImage = () => {
      const attributes = attrs.value;
      // reset status
      loading.value = true;
      hasLoadError.value = false;

      const img = new Image();
      img.onload = (e) => handleLoad(e, img);
      // 图片加载失败
      img.onerror = handleError;

      Object.keys(attributes).forEach((key) => {
        console.log("key", key);
      });

      img.src = props.src as string;
    };

    // 加载
    const handleLoad = (e: Event, img: HTMLImageElement) => {
      imgWidth.value = img.width;
      imgHeight.value = img.height;
      loading.value = false;
      hasLoadError.value = false;
    };

    // 错误处理
    const handleError = (e: Event) => {
      loading.value = false;
      hasLoadError.value = true;
      emit("error", e);
    };

    // 处理懒加载
    const handleLazyLoad = () => {
      // 在容器里面的图片才被加载
      // console.log("a", isInContainer(container.value, _scrollContainer));

      if (isInContainer(container.value, _scrollContainer)) {
        loadImage();
        removeLazyLoadListener();
      }
    };

    // lazy loading事件
    const addLazyLoadListener = () => {
      const { scrollContainer } = props;
      // 是html元素
      if (isHtmlEle(scrollContainer)) {
        _scrollContainer = scrollContainer;
      } else if (isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer = document.querySelector(scrollContainer);
      } else {
        _scrollContainer = getScrollContainer(container.value);
      }
      if (_scrollContainer) {
        // 给container添加滚动事件
        _lazyLoadHandler = throttle(handleLazyLoad, 200);
        on(_scrollContainer, "scroll", _lazyLoadHandler);
        setTimeout(() => handleLazyLoad(), 100);
      }
    };

    const removeLazyLoadListener = () => {
      if (!_scrollContainer || !_lazyLoadHandler) return;
      off(_scrollContainer, "scroll", _lazyLoadHandler);
      _scrollContainer = null;
      _lazyLoadHandler = null;
    };

    watch(
      () => props.src,
      () => {
        loadImage();
      }
    );

    onMounted(() => {
      if (props.lazy) {
        // TODO
        nextTick(addLazyLoadListener);
      } else {
        loadImage();
      }
    });

    return {
      container,
      attrs,
      loading,
      hasLoadError,
      imageStyle,
      alignCenter,
      preview,
      showViewer,
      clickHandler,
      closeViewer,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-image.scss";
</style>
