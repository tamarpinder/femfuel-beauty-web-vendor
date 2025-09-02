'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Search,
  BookOpen,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Play,
  FileText,
  Video,
  Headphones,
  Calendar,
  Eye,
  Heart,
  Filter,
  Sparkles
} from "lucide-react"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  
  const categories = [
    { id: "all", label: "Todo", count: 24 },
    { id: "tutorials", label: "Tutoriales", count: 8 },
    { id: "business", label: "Crecer tu Negocio", count: 6 },
    { id: "trends", label: "Tendencias", count: 5 },
    { id: "tips", label: "Consejos Pro", count: 5 }
  ]

  const featuredArticle = {
    id: 1,
    title: "Guía Completa: Cómo Aumentar tus Ingresos 300% en 6 Meses",
    excerpt: "Estrategias probadas por cientos de proveedores exitosos para transformar completamente tu negocio de belleza.",
    category: "business",
    author: "María González",
    authorRole: "Business Coach",
    readTime: "12 min",
    publishDate: "15 Nov 2024",
    image: "/blog/featured-growth.jpg",
    tags: ["Crecimiento", "Ingresos", "Estrategias", "Éxito"],
    views: "15.2k",
    likes: "2.1k"
  }

  const articles = [
    {
      id: 2,
      title: "10 Técnicas de Colorimetría que Todo Estilista Debe Dominar",
      excerpt: "Domina el arte del color con estas técnicas avanzadas que te convertirán en la referencia de tu área.",
      category: "tutorials",
      author: "Ana Rodríguez",
      authorRole: "Colorista Experta",
      readTime: "8 min",
      publishDate: "12 Nov 2024",
      image: "/blog/colorimetria.jpg",
      tags: ["Color", "Técnicas", "Estilismo"],
      views: "8.5k",
      likes: "1.2k",
      type: "article"
    },
    {
      id: 3,
      title: "Marketing Digital para Salones: Estrategias que Funcionan",
      excerpt: "Cómo usar redes sociales y marketing digital para atraer clientes de manera constante.",
      category: "business",
      author: "Carlos Martínez",
      authorRole: "Digital Marketing",
      readTime: "10 min",
      publishDate: "10 Nov 2024",
      image: "/blog/marketing.jpg",
      tags: ["Marketing", "Redes Sociales", "Clientes"],
      views: "12.3k",
      likes: "1.8k",
      type: "article"
    },
    {
      id: 4,
      title: "Video Tutorial: Tendencias de Corte para 2025",
      excerpt: "Descubre los cortes que marcarán tendencia el próximo año y cómo adaptarlos a diferentes tipos de rostro.",
      category: "trends",
      author: "Sofia Jiménez",
      authorRole: "Trend Specialist",
      readTime: "15 min",
      publishDate: "8 Nov 2024",
      image: "/blog/trends-2025.jpg",
      tags: ["Tendencias", "Cortes", "2025"],
      views: "20.1k",
      likes: "3.2k",
      type: "video"
    },
    {
      id: 5,
      title: "Cómo Manejar Clientes Difíciles: Guía Práctica",
      excerpt: "Estrategias probadas para convertir situaciones difíciles en oportunidades de crecimiento.",
      category: "tips",
      author: "Lucia Fernández",
      authorRole: "Customer Service Expert",
      readTime: "6 min",
      publishDate: "5 Nov 2024",
      image: "/blog/customer-service.jpg",
      tags: ["Clientes", "Comunicación", "Profesionalismo"],
      views: "9.7k",
      likes: "1.5k",
      type: "article"
    },
    {
      id: 6,
      title: "Podcast: Entrevista con la Empresaria del Año",
      excerpt: "Conversación exclusiva con María Santos, quien construyó un imperio de belleza desde cero.",
      category: "business",
      author: "FemFuel Team",
      authorRole: "Equipo Editorial",
      readTime: "45 min",
      publishDate: "3 Nov 2024",
      image: "/blog/podcast-maria.jpg",
      tags: ["Inspiración", "Empresarias", "Éxito"],
      views: "18.6k",
      likes: "2.7k",
      type: "podcast"
    }
  ]


  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const searchedArticles = searchTerm 
    ? filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredArticles

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
              Centro de Conocimiento
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight max-w-5xl mx-auto">
              Blog y Recursos
            </h1>
            <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
              Todo lo que necesitas para hacer crecer tu negocio de belleza. Tutoriales, consejos de expertos, 
              tendencias y recursos descargables gratuitos.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-femfuel-medium h-5 w-5" />
                <Input
                  placeholder="Buscar artículos, tutoriales, recursos..."
                  className="pl-12 h-12 text-lg border-2 border-femfuel-rose/20 focus:border-femfuel-rose"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id 
                    ? "bg-femfuel-rose hover:bg-femfuel-rose/90 text-white" 
                    : "border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
              Artículo Destacado
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark">
              Lo más popular esta semana
            </h2>
          </div>

          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-0">
              {/* Image */}
              <div className="lg:w-1/2 relative">
                <div className="aspect-video lg:aspect-square bg-gradient-to-br from-femfuel-rose/10 to-femfuel-gold/10 relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-20 w-20 text-femfuel-rose mx-auto mb-4 opacity-20" />
                      <p className="text-femfuel-medium">Artículo Destacado</p>
                    </div>
                  </div>
                  <Badge className="absolute top-6 right-6 bg-femfuel-gold text-white">
                    Destacado
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredArticle.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-femfuel-rose/10 text-femfuel-rose">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-lg text-femfuel-medium mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                {/* Author & Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                      <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                        <Users className="h-5 w-5 text-femfuel-medium" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-femfuel-dark text-sm">{featuredArticle.author}</p>
                      <p className="text-xs text-femfuel-medium">{featuredArticle.authorRole}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-femfuel-medium">
                    <p className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredArticle.views}
                    </p>
                    <p className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {featuredArticle.likes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-femfuel-medium mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredArticle.readTime} lectura
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredArticle.publishDate}
                  </span>
                </div>

                <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white w-full sm:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Leer Artículo Completo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-4">
              Últimos artículos y tutoriales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Mantente actualizado con los mejores consejos, técnicas y estrategias del mundo de la belleza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedArticles.map((article) => (
              <Card key={article.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Image & Type Indicator */}
                <div className="aspect-video bg-gradient-to-br from-femfuel-rose/10 to-femfuel-gold/10 relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      {article.type === 'video' && <Video className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      {article.type === 'podcast' && <Headphones className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      {article.type === 'article' && <FileText className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      <p className="text-femfuel-medium text-xs capitalize">{article.type}</p>
                    </div>
                  </div>
                  
                  {article.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-femfuel-rose rounded-full flex items-center justify-center shadow-lg">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <Badge className="absolute top-4 left-4 bg-femfuel-gold text-white capitalize">
                    {categories.find(c => c.id === article.category)?.label}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-femfuel-rose/10 text-femfuel-rose">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-bold text-femfuel-dark mb-3 line-clamp-2 group-hover:text-femfuel-rose transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-femfuel-medium mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                      <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                        <Users className="h-4 w-4 text-femfuel-medium" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-femfuel-dark">{article.author}</p>
                      <p className="text-xs text-femfuel-medium">{article.authorRole}</p>
                    </div>
                  </div>

                  {/* Stats & Date */}
                  <div className="flex items-center justify-between text-xs text-femfuel-medium mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {article.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white group-hover:bg-femfuel-rose group-hover:text-white transition-all">
                    {article.type === 'video' ? 'Ver Video' : article.type === 'podcast' ? 'Escuchar' : 'Leer Artículo'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Sparkles className="h-16 w-16 text-femfuel-rose mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-4">
                Mantente al día con lo último
              </h2>
              <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
                Recibe los mejores consejos, tutoriales exclusivos y tendencias directamente en tu email.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Tu email"
                    className="flex-1 h-12 border-2 border-femfuel-rose/20 focus:border-femfuel-rose"
                  />
                  <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white px-6">
                    Suscribirse
                  </Button>
                </div>
                <p className="text-xs text-femfuel-medium mt-3">
                  Sin spam. Solo contenido valioso. Cancela cuando quieras.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <VendorFooter />
    </div>
  )
}