export const duplicateBatchExists = (data: any) => data?.reduce((accumulator, value) => {
    const previousVal = accumulator.previousVal;
    const duplicate = previousVal?.fishId === value.fishId && previousVal?.age?.value === value.age.value;
    if(duplicate) {
        return {previousVal: value, duplicateExist: true}
    }
    return {previousVal: value, duplicateExist: accumulator.duplicateExist}
  }, {duplicateExist: false, previousVal: null}).duplicateExist;