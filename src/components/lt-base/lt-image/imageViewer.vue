<template>
  <transition name="viewer-fade">
    <div
      ref="wrapper"
      :tabindex="-1"
      class="lt-image-viewer__wrapper"
      :style="{ zIndex }"
      v-show="!loading"
    >
      <!-- 遮罩层 -->
      <div
        class="lt-image-viewer__mask"
        @click.self="hideOnClickModal && hide()"
      ></div>

      <!-- 右上角关闭按钮 -->
      <span class="lt-image-viewer__btn lt-image-viewer__close" @click="hide">
        <i class="el-icon-close"></i>
      </span>

      <!-- 左右切换箭头按钮 -->
      <div>
        <!-- 上一个 -->
        <span class="lt-image-viewer__btn lt-image-viewer__prev" @click="prev">
          <i class="el-icon-arrow-left"></i>
        </span>
        <!-- 下一个 -->
        <span class="lt-image-viewer__btn lt-image-viewer__next" @click="next">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>

      <!-- 底部按钮 -->
      <div class="lt-image-viewer__btn lt-image-viewer__actions">
        <div class="lt-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i></i>
          <i
            class="el-icon-refresh-left"
            @click="handleActions('anticlocelise')"
          ></i>
          <i
            class="el-icon-refresh-right"
            @click="handleActions('clocelise')"
          ></i>
        </div>
      </div>

      <!-- 图片展示区域 -->
      <div class="lt-image-viewer__canvas">
        <img
          ref="img"
          class="lt-image-viewer__img"
          v-for="(url, i) in urlList"
          :key="url"
          :src="url"
          :style="imgStyle"
          v-show="index === i"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  onMounted,
} from "@vue/runtime-core";
import { imageViewerProps } from "./props";
import { rafThrottle } from "@u/utils.ts";
import { on, off } from "@u/dom.ts";
import { EVENT_CODE } from "@u/aria.ts";

const CLOSE_EVENT = "close";
const SWITCH_EVENT = "switch";
const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen",
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original",
  },
};
type ImageViewerAction = "zoomIn" | "zoomOut" | "clocelise" | "anticlocelise";

export default defineComponent({
  name: "ImageViewer",
  props: imageViewerProps,
  emits: [CLOSE_EVENT, SWITCH_EVENT],
  setup(props: any, { emit }) {
    let _keyDownHandler = null; // 键盘按下事件
    let _mouseWheelHandler = null; // 滑轮滚动事件
    let _dragHandler = null; // 拖拽事件

    const index = ref<number>(props.initialIndex);
    const mode = ref(Mode.CONTAIN);
    const wrapper = ref(null);
    const loading = ref(true);

    let transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    });

    // 图片样式
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } =
        transform.value;

      let style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? "transform .3s" : "",
        marginLeft: `${offsetX}px`,
        marginTop: `${offsetY}px`,
      } as CSSStyleDeclaration;

      if (mode.value.name === Mode.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }

      return style;
    });

    // 是否只有一张图片
    const isSingle = computed(() => {
      return props.urlList?.length <= 1;
    });

    // 是否是第一个
    const isFirst = computed(() => {
      return index.value === 0;
    });
    // 是否是最后一个
    const isLast = computed(() => {
      return index.value === props.urlList?.length - 1;
    });
    // 上一个
    const prev = () => {
      if (!props.infinite && isFirst.value) return;
      const len = props.urlList?.length;
      index.value = (index.value - 1 + len) % len;
    };
    // 下一个
    const next = () => {
      if (!props.infinite && isLast.value) return;
      const len = props.urlList?.length;
      index.value = (index.value + 1) % len;
    };
    // 关闭modal
    const hide = () => {
      deviceSupportUninstall();
      emit(CLOSE_EVENT);
    };

    // 底部操作功能
    const handleActions = (action: ImageViewerAction, options = {}) => {
      const { rotateDeg, enableTransition, zoomRate } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };

      switch (action) {
        // 缩小
        case "zoomOut": {
          if (transform.value.scale > 0.2) {
            transform.value.scale = parseFloat(
              (transform.value.scale - zoomRate).toFixed(3)
            );
          }
          break;
        }
        // 放大
        case "zoomIn": {
          transform.value.scale = parseFloat(
            (transform.value.scale + zoomRate).toFixed(3)
          );
          break;
        }
        case "clocelise": {
          transform.value.deg += rotateDeg;
          break;
        }
        case "anticlocelise": {
          transform.value.deg -= rotateDeg;
          break;
        }
      }
      transform.value.enableTransition = enableTransition;
    };

    const toggleMode = () => {
      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = Mode[modeNames[nextIndex]];
      reset();
    };

    // 重置
    const reset = () => {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      };
    };

    // 支持滚动和键盘事件
    const deviceSupportInstall = () => {
      // 键盘按下事件
      _keyDownHandler = rafThrottle((e) => {
        switch (e.code) {
          case EVENT_CODE.esc:
            hide();
            break;
          case EVENT_CODE.space:
            toggleMode();
            break;
          case EVENT_CODE.left:
            prev();
            break;
          case EVENT_CODE.right:
            next();
            break;
          case EVENT_CODE.up:
            handleActions("zoomIn");
            break;
          case EVENT_CODE.down:
            handleActions("zoomOut");
            break;
        }
      });

      _mouseWheelHandler = rafThrottle((e) => {
        // wheelDelta 大于0，意为鼠标向上，小于0，意为鼠标向下
        // 火狐浏览器不支持wheelDelta，需要使用detail来判断
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;

        if (delta > 0) {
          handleActions("zoomIn", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        } else {
          handleActions("zoomOut", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        }
      });

      // 鼠标滚动事件
      on(document, "mousewheel", _mouseWheelHandler);
      on(document, "keydown", _keyDownHandler);
    };

    // 关闭后卸载滚动和键盘事件
    const deviceSupportUninstall = () => {
      off(document, "mousewheel", _mouseWheelHandler);
      off(document, "keydown", _keyDownHandler);
      _keyDownHandler = null;
      _mouseWheelHandler = null;
    };

    const handleImgLoad = () => {
      loading.value = false;
    };

    const handleImgError = () => {
      loading.value = false;
    };

    // 按下拖拽事件
    const handleMouseDown = (e: MouseEvent) => {
      if (loading.value || e.button !== 0) return;

      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;

      _dragHandler = rafThrottle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY,
        };
      });

      on(document, "mousemove", _dragHandler);
      on(document, "mouseup", () => {
        off(document, "mousemove", _dragHandler);
      });

      e.preventDefault();
    };

    watch(index, (val) => {
      reset();
      emit(SWITCH_EVENT, val);
    });

    onMounted(() => {
      wrapper.value?.focus();
      deviceSupportInstall();
    });

    return {
      wrapper,
      mode,
      isSingle,
      isFirst,
      isLast,
      index,
      loading,
      hide,
      prev,
      next,
      imgStyle,
      handleActions,
      toggleMode,
      handleImgLoad,
      handleImgError,
      handleMouseDown,
    };
  },
});
</script>

<style lang="scss">
@import "./imageViewer.scss";
</style>
