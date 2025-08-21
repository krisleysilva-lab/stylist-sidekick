import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer";
import { Camera, Upload, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export const MobileActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Bottom Action Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
        <div className="bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="flex gap-3">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button size="lg" className="flex-1 h-12" variant="default">
                  <Camera className="w-5 h-5 mr-2" />
                  Começar Diagnóstico
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <DrawerHeader className="text-left">
                  <DrawerTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Diagnóstico Inteligente
                  </DrawerTitle>
                </DrawerHeader>
                
                <div className="px-4 pb-6 space-y-6">
                  <p className="text-muted-foreground">
                    Vamos analisar o cabelo da sua cliente com precisão profissional.
                  </p>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div className="space-y-2">
                      <p className="font-medium">Adicione uma foto do cabelo atual</p>
                      <p className="text-sm text-muted-foreground">
                        Para melhor resultado: luz natural, cabelo seco, raiz e comprimento visíveis
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Tirar Foto / Escolher da Galeria
                    </Button>
                  </div>

                  {/* Quick Questions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Informações básicas:</h3>
                    
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-between h-12">
                        Histórico químico da cliente
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between h-12">
                        % de cabelos brancos
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-between h-12">
                        Resultado desejado
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <DrawerFooter className="flex-row gap-3">
                  <DrawerClose asChild>
                    <Button variant="outline" className="flex-1">
                      Cancelar
                    </Button>
                  </DrawerClose>
                  <Button className="flex-1">
                    Iniciar Análise
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            
            <Button size="lg" variant="outline" className="h-12 px-4">
              Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Upload Quick */}
      <div className="fixed bottom-20 right-4 z-30 sm:hidden">
        <Button 
          size="icon" 
          className="w-14 h-14 rounded-full shadow-glow bg-primary hover:bg-primary-dark"
          onClick={() => setIsOpen(true)}
        >
          <Upload className="w-6 h-6" />
        </Button>
      </div>

      {/* Add bottom padding to body content on mobile to avoid overlap */}
      <div className="h-20 sm:hidden" />
    </>
  );
};