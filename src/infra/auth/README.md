## Anotação do nest

- Controller
 - uma porta de entrada para a nossa aplicação via http

- Module no nest
 - o module basicamanete reuni tudo que tem a ver com a minha aplicação como controller ou services etc
 - se o meu controller precisa de uma dependencia eu coloco dentro de providers

- @Injectable()
 - esse decoretor seria injetavel, pode ser que o arquivo que tiver com     @Injectable() pode depender da class

- Tudo que eu não recebo via http é providers

- nest é baseado em decoretors
 - decoretors é uma função ela tra um comportamento especifico em algo
 - exemplo => @Controller(), @Get

- Mappers
 - são class responsaveis por converter uma entidade em um formato de uma camada para o formatado de uma outra camada

## Configuração do JWT

# Gerar a chave privada
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048

# Gerar a chave pública
openssl rsa -pubout -in private.key -out public.key -outform PEM

# Converter a chave privada para base64
JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A)

# Converter a chave pública para base64
JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A)

# Adicionar as chaves ao arquivo .env
echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> .env
echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> .env

# Remover os arquivos de chave
rm private.key public.key
