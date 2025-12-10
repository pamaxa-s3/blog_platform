import cls from './common.module.css'

const LoadingSpinner=()=> {
  return (
    <div className={cls.loaderWrapper}>
    <span className={cls.loader}></span>
    </div>
    )
}

export default LoadingSpinner