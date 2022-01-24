declare const window: any;

const Header = () => {
    const moveSection = (target: number) => {
        window.fullpage_api.moveTo(target, 0)
    }
    return (
        <div id={"header"}>
            <ul className={'nav'}>
                <li>
                    <a href="#home" onClick={() => moveSection(1)}>Home</a>
                </li>
                <li>
                    <a href="#features" onClick={() => moveSection(2)}>Features</a>
                </li>
                <li>
                    <a href="#gallery" onClick={() => moveSection(3)}>Gallery</a>
                </li>
                <li>
                    <a href="#news" onClick={() => moveSection(4)}>News</a>
                </li>
            </ul>
        </div>
    )
}

export default Header