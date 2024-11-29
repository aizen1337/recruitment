"use client"
import { useNavigation } from "@/hooks/useNavigation"
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
export default function NavigationForm({
  parentId
}: {
  parentId?: string
}) {
    const {addNavigationElement } = useNavigation()
    const form = useForm<z.infer<typeof NavigationElementSchema>>({
        resolver: zodResolver(NavigationElementSchema),
        defaultValues: {
            label: "",
            url: "",
        },
      })
    function onSubmit(values: z.infer<typeof NavigationElementSchema>) {
        
        form.reset()
        addNavigationElement({
            parentId: parentId || null,
            label: values.label,
            url: values.url,
        })

    }
    return (
        <Form {...form}>
        <form onSubmit={() => form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={'label'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa</FormLabel>
                <FormControl>
                  <Input className="rounded-lg" placeholder="np. Promocje" {...field} />
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