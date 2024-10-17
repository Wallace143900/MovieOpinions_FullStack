import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div>
                <h1>MovieOpinions</h1>
                <div>
                    <Link href="/userRegistro"><button>Registrar</button></Link>
                    <Link href="/userLogin"><button>Logar</button></Link>
                </div>
            </div>
        </header>
    )
}