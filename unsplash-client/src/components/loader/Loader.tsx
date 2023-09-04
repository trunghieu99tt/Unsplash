import defaultClasses from './loader.module.css'

const Loader = () => {
    return <div className={defaultClasses.root}>
        <div className={defaultClasses.loader}></div>
    </div>
}

export default Loader;