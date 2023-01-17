import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@u/constant.ts';

export const useMove = (props, checkedStatus, propsKey, emit) => {
  const _emit = (value, type: 'left' | 'right', checked) => {
    emit(UPDATE_MODEL_EVENT, value)
    emit(CHANGE_EVENT, value, type, checked)
  }

  const addToLeft = () => {
    // currentValue是一个新数组，数组内容与modelValue相同
    let currentValue = props.modelValue.slice()
    checkedStatus.rightChecked.forEach(item => {
      const index = currentValue.indexOf(item)
      if( index > -1 ) {
        currentValue.splice(index, 1)
      }
    })

    _emit(currentValue, 'left', checkedStatus.rightChecked)
  }

  const addToRight = () => {
    let currentValue = props.modelValue.slice()

    const itemsToBeMoved = props.data.filter(item => {
      const itemKey = item[propsKey.value]

      return checkedStatus.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey)
    }).map(item => item[propsKey.value])

    currentValue = props.targetOrder === 'unshift' ?
      itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved)

    _emit(currentValue, 'right', checkedStatus.leftChecked)
  }

  return {
    addToLeft,
    addToRight
  }
}