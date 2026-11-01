import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** Recebe `reset` para o usuário tentar renderizar de novo. */
  fallback: (reset: () => void) => ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  failed: boolean
}

/**
 * Captura erros de renderização (e falhas ao baixar um chunk carregado com React.lazy)
 * para que um problema isolado, como o mapa, não derrube a página inteira.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Atlas: render error', error, info.componentStack)
  }

  reset = () => this.setState({ failed: false })

  render() {
    return this.state.failed ? this.props.fallback(this.reset) : this.props.children
  }
}
