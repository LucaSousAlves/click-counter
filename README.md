# VobysApp - Contador de Cliques

**Nome do candidato:** Lucas de Sousa Alves

## Descrição do Projeto

O VobysApp é um aplicativo móvel desenvolvido em React Native que permite contabilizar cliques, registrar timestamps de cada interação, persistir o histórico localmente e exportar os dados.

## Funcionalidades

- **Contador de Cliques**: Botão principal que incrementa o contador a cada toque
- **Histórico Detalhado**: Lista com data e hora exatas de cada clique
- **Persistência Local**: Dados salvos automaticamente usando AsyncStorage
- **Exportação**: Gera arquivo .txt com histórico e abre compartilhador nativo
- **Limpeza Segura**: Opção para limpar histórico com confirmação

## Tecnologias Utilizadas

- **React Native 0.81.4**
- **TypeScript**
- **Context API** para gerenciamento de estado
- **AsyncStorage** para persistência local
- **react-native-share** para exportação
- **react-native-fs** para manipulação de arquivos
- **react-native-safe-area-context** para áreas seguras

## Pré-requisitos

- Node.js LTS (versão 20 ou superior)
- Java JDK 17 (para Android)
- Android Studio com SDK/Emulador configurados
- Xcode (para iOS, apenas macOS)
- Yarn ou npm

## Instalação e Execução

### 1. Clone o repositório
```bash
git clone -b main git@github.com:LucaSousAlves/click-counter.git
cd click-counter
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn
```

### 3. Configuração para iOS (macOS)
```bash
cd ios
pod install
cd ..
```

### 4. Execute o aplicativo

#### Android
# Antes de executar, certifique-se de que:
# - O emulador Android está iniciado no Android Studio
#   OU
# - Um dispositivo físico está conectado via USB e reconhecido com `adb devices`

```bash
# Com emulador Android iniciado ou dispositivo conectado
npx react-native run-android
```

#### iOS (macOS)
```bash
# Execute em um simulador iOS
npx react-native run-ios
```

## Como Usar

1. **Contar Cliques**: Toque no botão "Clique Aqui!" para incrementar o contador
2. **Ver Histórico**: O histórico é exibido automaticamente abaixo do contador
3. **Exportar Dados**: Use o botão "Exportar" para gerar e compartilhar um arquivo .txt
4. **Limpar Dados**: Use o botão "Limpar" para zerar o contador e histórico (com confirmação)


## Decisões Técnicas

- **AsyncStorage**: Solução padrão para persistência local em React Native, confiável e bem documentada
- **TypeScript**: Adicionei tipagem estática para melhor manutenibilidade e detecção de erros em tempo de desenvolvimento
- **Componentes Funcionais**: Uso de hooks para gerenciamento de estado e ciclo de vida, mais moderno que classes
- **Formatação de Data**: Utiliza `toLocaleString` com configuração brasileira para formatação consistente e familiar ao usuário
- **Estrutura de Pastas**: Organizei por responsabilidade (components, contexts, utils, etc.) para facilitar manutenção

## Desafios Encontrados e Soluções

Durante o desenvolvimento, enfrentei alguns desafios técnicos importantes:

### 1. **Broadcast Receiver Android 13+ (RECEIVER_EXPORTED)**
- **Problema**: Erro "One of RECEIVER_EXPORTED or RECEIVER_NOT_EXPORTED should be specified"
- **Causa**: Android 13+ exige que broadcast receivers especifiquem explicitamente se são exportados
- **Solução**: Atualizei `react-native-share` de v8.2.2 para v12.2.0 que já inclui as correções

### 2. **URI Null no Compartilhamento**
- **Problema**: Erro "Attempt to invoke virtual method 'java.lang.String android.net.Uri.getScheme()' on a null object reference"
- **Causa**: Configuração do FileProvider causando conflitos com URIs
- **Solução**: Implementei uma abordagem simples que gera o arquivo .txt e usa file URI para compartilhamento

### 3. **Persistência de Datas**
- **Problema**: JSON.stringify/parse não preserva objetos Date
- **Solução**: Conversão manual de strings para objetos Date no carregamento

### 4. **Configuração Android**
- **Problema**: Configuração de ANDROID_HOME e PATH
- **Solução**: Documentei as configurações necessárias no README




## Formato de Exportação

O arquivo .txt exportado contém uma linha por registro, ordenado do mais recente para o mais antigo:

```
17/09/2025 15:30:05
17/09/2025 15:29:58
17/09/2025 15:29:45
```
