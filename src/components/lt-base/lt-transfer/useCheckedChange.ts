// index中panelchecked数据变化时触发
export const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
export const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";

export const useCheckedChange = (checkedStatus, emit) => {
  const onSourceCheckedChange = (val, movedKeys) => {
    checkedStatus.leftChecked = val;
    if (movedKeys === undefined) return;
    emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  const onTargetCheckedChange = (val, movedKeys) => {
    checkedStatus.rightChecked = val;
    if (movedKeys === undefined) return;
    emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
  };

  return {
    onSourceCheckedChange,
    onTargetCheckedChange,
  };
};
