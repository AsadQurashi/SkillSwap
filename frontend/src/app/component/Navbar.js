import Link from "next/link";


export default function Navbar() {
    return (
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/SignIn"> SignIn </Link>
        <Link href="/SignUp">SignUp</Link>
        <Link href="/skills/CreateSkill">SkillForm</Link>
        <Link href="/skills/DisplaySkill">DisplaySkill</Link>
      </nav>
    );
}