export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex justify-between border-t border-line px-[7%] py-7 text-[10px] tracking-[2px] text-[#777] max-[700px]:block">
      <span>DJDovi — Johannesburg DJ &amp; Event Bookings</span>
      <span className="max-[700px]:mt-2 max-[700px]:block">© {year}</span>
    </footer>
  )
}
