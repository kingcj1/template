import {
    handleMotamo
} from './md'
import {
    usePiniaStore
} from './pinia'

// 统一导出hooks方法
const hooks = {
    md: handleMotamo,
    pinia: usePiniaStore,
}
export default hooks;