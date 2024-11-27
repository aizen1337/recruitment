"use client"
import { NavigationElementSchema, useNavigation } from "@/hooks/useNavigation"
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
export default function NavigationForm() {
    const {addNavigationElement } = useNavigation()
    const form = useForm<z.infer<typeof NavigationElementSchema>>({
        resolver: zodResolver(NavigationElementSchema),
        defaultValues: {
            label: "",
            url: "",
        },
      })
    function onSubmit(values: z.infer<typeof NavigationElementSchema>, e?: React.BaseSyntheticEvent) {
        
        form.reset()
        addNavigationElement({
            label: values.label,
            url: values.url,
            subelements: []
        })

    }
    return (
        <Form {...form}>
        <form onSubmit={(e: Event) => form.handleSubmit(onSubmit)(e)} className="space-y-8">
          <FormField
            control={form.control}
            name={'label'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa</FormLabel>
                <FormControl>
                  <Input placeholder="np. Promocje" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name={'url'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="Wklej lub wyszukaj" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}