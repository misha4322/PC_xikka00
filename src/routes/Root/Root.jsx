import { Outlet, NavLink } from "react-router-dom";
import s from "./Root.module.css"
import trash from '../../assets/trash.svg'
import logo from '../../assets/logo.svg'

export const Root = () => {
  return (
    <div className={s.menu}>

      <nav className={s.div}>
      < NavLink className={({ isActive, isPending }) => isActive ? s.active : isPending ? s.loading : s.btn} to={'home'}>
          <div className={s.qwerty}> 
          <img src={logo} alt="" /></div>
        </NavLink>
        <NavLink className={({ isActive, isPending }) => isActive ? s.active : isPending ? s.loading : s.btn} to={'home'}>
          <div className={s.qwerty}> Главная</div>
        </NavLink>
        <NavLink className={({ isActive, isPending }) => isActive ? s.active : isPending ? s.loading : s.btn} to={'gather'}>
          <div className={s.qwerty}>Конфигуратор</div>
        </NavLink>

        <NavLink className={({ isActive, isPending }) => isActive ? s.active : isPending ? s.loading : s.btn} to={'basket'}>
          <div className={s.qwerty}>
            <img src={trash} alt="" />

          </div>
        </NavLink>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  )
};