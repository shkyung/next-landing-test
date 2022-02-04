declare const window: any;

const Header = () => {
    const moveSection = (target: number) => {
        window.fullpage_api.moveTo(target, 0)
    }
    return (
        <div id={"header"}>
            <ul className={'nav'}>
                <li>
                    <a onClick={() => moveSection(1)}>Home</a>
                </li>
                <li>
                    <a onClick={() => moveSection(2)}>Features</a>
                </li>
                <li>
                    <a onClick={() => moveSection(5)}>Gallery</a>
                </li>
                <li>
                    <a onClick={() => moveSection(6)}>News</a>
                </li>
            </ul>
        </div>
    )
}

export default Header