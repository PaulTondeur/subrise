import { Card } from "@/components/ui/card";
import { User, Users } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Wat wij vaak horen</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <p className="text-gray-600 mb-6">
                  &quot;Ik heb jarenlang de WBSO via een bemiddelaar geregeld. Maar eigenlijk deed
                  ik zelf het meeste werk, inclusief het schrijven. Uiteindelijk ben ik het zelf
                  gaan doen, met hulp van AI. Toch vorig jaar weer met een bureau in zee gegaan – 8%
                  fee – en alsnog moest ik zelf de RVO-vragen beantwoorden.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Een ervaren ondernemer</p>
                    <p className="text-sm text-gray-500">Meerdere jaren WBSO ervaring</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-8">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <p className="text-gray-600 mb-6">
                  &quot;We wilden de WBSO zelf doen, maar twijfelden of we het goed genoeg zouden
                  aanpakken. Uiteindelijk toch een adviseur ingeschakeld, maar dat voelde omslachtig
                  en duur.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Een innovatief team</p>
                    <p className="text-sm text-gray-500">Eerste WBSO ervaring</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
