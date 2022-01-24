import Link from "next/link";

const Header = () => {
    return (
        <div id={"header"}>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/features">
                <a>Features</a>
            </Link>
            <Link href="/gallery">
                <a>Gallery</a>
            </Link>
            <Link href="/news">
                <a>News</a>
            </Link>
        </div>
    )
}

export default Header