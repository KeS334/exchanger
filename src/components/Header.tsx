import {useServerData} from "../hooks/serverData";

const Header = () => {
    const {getRates} = useServerData();
    const rates = getRates();

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <a href="/exchanger">exChanger</a>
                </div>
                <div className="header__current-rate">
                    <p>USD: <span>{rates.USD}</span></p>
                    <p>EUR: <span>{rates.EUR}</span></p>
                </div>

            </div>
        </header>
    );
};

export default Header;
