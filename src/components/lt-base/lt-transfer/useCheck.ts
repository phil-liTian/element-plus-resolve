import { computed } from "vue";

export const useCheck = (props) => {
  const labelProp = computed(() => props.props?.label || "label");

  const keyProp = computed(() => props.props.key || "key");

  const filteredData = computed(() => {
    return props.data;
  });

  return {
    labelProp,
    keyProp,
    filteredData,
  };
};
