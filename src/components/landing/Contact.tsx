import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, Send, Link2 } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      (e.currentTarget as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contacts" className="container mx-auto py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Контакты</h2>
          <p className="mt-2 text-muted-foreground">Свяжитесь удобным способом или оставьте заявку — ответим в течение дня.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="size-4" /> <a href="tel:+78120000000">+7 (812) 000‑00‑00</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="size-4" /> <a href="https://wa.me/78120000000" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Link2 className="size-4" /> <a href="https://vk.com" target="_blank" rel="noreferrer">VK</a></li>
            <li className="flex items-center gap-2"><Link2 className="size-4" /> <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram*</a></li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> <a href="mailto:hello@example.com">hello@example.com</a></li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">*Запрещённая в РФ организация — присутствуем для удобства клиентов.</p>
        </div>
        <form id="order" onSubmit={onSubmit} className="rounded-lg border p-6 bg-card">
          <h3 className="text-lg font-semibold">Форма заявки</h3>
          <div className="mt-4 grid gap-4">
            <Input required name="name" placeholder="Ваше имя" aria-label="Имя" />
            <Input required name="phone" placeholder="Телефон" aria-label="Телефон" />
            <Input name="email" type="email" placeholder="Email (необязательно)" aria-label="Email" />
            <select name="service" className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="DTF">Печать DTF</option>
              <option value="Embroidery">Машинная вышивка</option>
              <option value="Combo">Комбинированная техника</option>
              <option value="Ready">Готовые изделия с нанесением</option>
            </select>
            <Textarea name="comment" placeholder="Опишите задачу: размеры, цвета, количество, ссылки на макет" aria-label="Комментарий" />
          </div>
          <Button type="submit" variant="hero" className="mt-5 w-full" disabled={loading}>
            <Send className="mr-2 size-4" /> {loading ? "Отправка..." : "Отправить"}
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">Санкт‑Петербург • Самовывоз по договорённости. Доставка по России: курьеры, СДЭК, Почта России.</p>
        </form>
      </div>
    </section>
  );
}
