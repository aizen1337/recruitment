"use client"
import { useNavigationStore } from "@/context/NavigationStoreProvider"
import { NavigationElementSchema } from "@/types/NavigationElement"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SyntheticEvent } from "react"
import { LucideTrash2 } from "lucide-react"
export default function NavigationForm({
  parentId
}: {
  parentId?: string
}) {
    const {addNavigationElement} = useNavigationStore((state) => state)
    const form = useForm<z.infer<typeof NavigationElementSchema>>({
        resolver: zodResolver(NavigationElementSchema),
        defaultValues: {
            parentId: null,
            label: '',
            url: '',
        },
      })
    function submit(values: z.infer<typeof NavigationElementSchema>, e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        addNavigationElement({
            parentId: parentId || null,
            label: values.label,
            url: values.url,
        });
    }
    return (
        <Form {...form}>
        <form onSubmit={(e: SyntheticEvent<HTMLFormElement>) => submit(form.getValues(), e)} 
        className="
        box-border
        flex
        flex-col
        items-start
        pb-[20px]
        gap-[20px]
        w-[1168px]
        h-[240px]
        bg-[#FFFFFF]
        rounded-[8px]
        border-1
      border-[#D0D5DD]
        "
        >
        
          <section className="flex justify-center items-start gap-[16px] pt-[20px] px-[24px] w-[1168px] h-[160px]">
          <div>
          <FormField
            control={form.control}
            name={'label'}
            render={({ field }) => (
              <FormItem
              className="
              flex
              flex-col
              items-start
              p-0
              gap-[6px]
              w-[1064px]
              h-[66px]"
              >
                <FormLabel
                className="
                w-[46px]
                h-[20px]
                text-[#344054]
                text-[14px]
                leading-[20px]
                ">Nazwa</FormLabel>
                <FormControl>
                <Input 
                placeholder="np. Promocje"
                className="
                flex
                flex-col
                items-start
                p-0
                gap-[8px]
                w-[1064px]
                h-[40px]
                text-[16px]
                leading-[24px]
                " 
                {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name={'url'}
            render={({ field }) => (
              <FormItem
              className="
              flex
              flex-col
              items-start
              p-0
              gap-[6px]
              w-[1064px]
              h-[66px]"
              >
                <FormLabel
                className="
                w-[46px]
                h-[20px]
                text-[#344054]
                text-[14px]
                leading-[20px]
                "
                >Link</FormLabel>
                <FormControl>
                  <Input placeholder="Wklej lub wyszukaj" {...field}
                className="
                flex
                flex-col
                items-start
                p-0
                gap-[8px] 
                w-[1064px]
                h-[40px]
                text-[16px]
                leading-[24px]
                "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div
           className="w-[40px] h-[40px]">
            <LucideTrash2/>
          </div>
          </section>
          <section className="
          flex
          items-start
          px-[24px]
          gap-[8px]
          w-[1168px]
          h-[40px]

          ">
          <Button type="reset" variant={'outline'}
          className="
          w-[72px]
          h-[40px]
          py-[10px]
          px-[14px]
          gap-[4px]
          rounded-[8px]
          shadow-[0px 1px 2px rgba(16, 24, 40, 0.05);]
          "          
          >Anuluj</Button>
          <Button type="submit" variant={'outline'} 
          className="
          w-[72px]
          h-[40px]
          py-[10px]
          px-[14px]
          gap-[4px]
          border-1
        border-[#D6BBFB]
          text-[#6941C6]
          rounded-[8px]
          shadow-[0px 1px 2px rgba(16, 24, 40, 0.05);]
          "
          >Dodaj</Button>
          </section>
        </form>
      </Form>

    )
}

