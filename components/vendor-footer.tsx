export function VendorFooter() {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="text-xl font-semibold">FemFuel Beauty</span>
        </div>

        <div className="text-center text-sm text-muted">© 2024 FemFuel Beauty. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}
