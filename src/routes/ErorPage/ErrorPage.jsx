import { useRouteError } from "react-router-dom";
import s from "./ErrorPage.module.css"

export const ErrorPage404 = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <nav className={Not_fount}>
            <h1 className={s.h1_nan}>Ошибка</h1>
            <h2 className={s.h1_nan}>404 не мы такие жизнь такая</h2>
            <p>
                <i>{error.statusText}</i>
            </p>
            <p>
                <i>{error.data}</i>
            </p>
        </nav>
    )
};

