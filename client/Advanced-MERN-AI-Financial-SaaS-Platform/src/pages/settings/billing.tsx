import { Separator } from "@/components/ui/separator"

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Support Us</h3>
        <p className="text-sm text-muted-foreground">
          Help us continue improving this project and building more free tools for everyone.
        </p>
      </div>

      <Separator />

      <div className="w-full">
        <div className="mt-0">
          <h1 className="text-lg font-medium mb-2">Support Future Enhancements</h1>

          <p className="text-base mb-2">
            This project has taken <strong>weeks and months</strong> of careful design,
            development, and iteration. Your support helps us continue working on
            new features, improvements, and long-term updates.
          </p>


          <br />
          <br />
        </div>
      </div>
    </div>
  )
}

export default Billing
