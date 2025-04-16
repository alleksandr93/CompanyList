import style from './InDevelopment.module.scss';

export const InDevelopment = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.icon}>🚧</div>
                <h1 className={style.title}>Компонент в разработке</h1>
                <p className={style.description}>
                    Этот раздел находится в активной разработке и скоро будет доступен.
                    Спасибо за понимание!
                </p>
                <div className={style.progress}>
                    <div className={style.progressBar}></div>
                </div>
            </div>
        </div>
    );
};