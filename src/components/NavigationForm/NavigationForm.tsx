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
                <FormLabel>Nazwa</FormLabel>
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
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="Wklej lub wyszukaj" {...field}
                className="
                flex
                flex-col
                items-start
                p-0
                gap-[8px] 
                w-[1064px]
                h-[40px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div>
            <LucideTrash2/>
          </div>
          </section>
          <section className="
          flex
          flex-col
          ">
          <Button type="reset" variant={'outline'}>Anuluj</Button>
          <Button type="submit" variant={'outline'}>Dodaj</Button>
          </section>
        </form>
      </Form>

    )
}


/* Frame 12 */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px 24px;
// gap: 8px;

// width: 1168px;
// height: 40px;


// /* Inside auto layout */
// flex: none;
// order: 1;
// align-self: stretch;
// flex-grow: 0;

// /* actions */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: flex-start;
// padding: 0px;
// gap: 8px;

// width: 155px;
// height: 40px;


// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;
