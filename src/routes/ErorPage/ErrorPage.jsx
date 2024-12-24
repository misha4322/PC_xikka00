import { useRouteError } from "react-router-dom";
import s from "./ErrorPage.module.css"

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className={s.Not_fount}>
            <h1 className={s.h1_nan}>Ошибка</h1>
            <h2 className={s.h1_nan}>404 не мы такие жизнь такая</h2>
            <p>
                <i>{error.statusText}</i>
            </p>
            <a href="/" className={s.qus}>На главную</a>
            <p>
                <i>{error.data}</i>
            </p>
        </div>
    )
};

