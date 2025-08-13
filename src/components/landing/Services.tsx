import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brush, Shirt, BadgeCheck } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Услуги и цены</h2>
        <p className="mt-2 text-muted-foreground">Прозрачные расценки и помощь с выбором оптимальной технологии под задачу.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brush className="size-5" />
              <CardTitle>Печать DTF</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Логотип (мал.) — от <Badge>200 ₽</Badge></li>
              <li>• Полноцветный принт — от <Badge>1300 ₽</Badge></li>
              <li>• Фото, арт, градиенты</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5" />
              <CardTitle>Машинная вышивка</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Надпись — от <Badge>300 ₽</Badge></li>
              <li>• Крупный рисунок — от <Badge>2000 ₽</Badge></li>
              <li>• Золотистые нити, плотная посадка</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shirt className="size-5" />
              <CardTitle>Готовые изделия</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Футболки — от <Badge>1700 ₽</Badge></li>
              <li>• Худи — от <Badge>2500 ₽</Badge></li>
              <li>• Свитшоты — от <Badge>2300 ₽</Badge></li>
            </ul>
          </CardContent>
        </Card>
              </div>
        </div>
    </section>
  );
}
