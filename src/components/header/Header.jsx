import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative flex h-[80px] justify-between items-center text-white py-6 px-8 md:px-32 bg-[#101720] drop-shadow-md">
            <a href="#">Pokédex Tcg</a>
            <div className="flex-1 flex justify-center">
                <ul className="hidden xl:flex items-center text-[16px] font-semibold gap-9">
                    <li>Pokédex</li>
                    <li>TCG</li>
                    <li>About Us</li>
                </ul>
            </div>

            <button className="xl:hidden block text-3xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <RxHamburgerMenu />
            </button>


            <div
                className={`absolute lg:hidden left-0 w-full top-[100%] bg-red-600 flex flex-col items-center gap-6 font-semibold text-lg transform transition-all duration-600 ${isMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
            >
                <ul>
                    <li>ciao</li>
                    <li>ciao</li>
                    <li>ciao</li>
                    <li>ciao</li>
                </ul>
            </div>
        </header>
    );
};

export default Header;