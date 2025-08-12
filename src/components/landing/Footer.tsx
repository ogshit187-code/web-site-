export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground">© {new Date().getFullYear()} DTF & Вышивка СПБ. Все права защищены.</p>
        <nav className="flex gap-5">
          <a href="#services" className="hover:underline">Услуги</a>
          <a href="#portfolio" className="hover:underline">Портфолио</a>
          <a href="#contacts" className="hover:underline">Контакты</a>
        </nav>
      </div>
    </footer>
  );
}
