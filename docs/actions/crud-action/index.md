# CrudAction

La classe CrudAction estende la classe Action e, oltre ai metodi ereditati, fornisce moltissime utilità per operare sui metodi predefiniti della CrudAction di portofino.

::: warning
Se hai esteso la CrudAction vedi [questa pagina](/config#crudactionclasses), al momento non è possibile riconoscere in altro modo una CrudAction estesa
:::

# Operazioni CRUD

::: tip
In tutti i metodi CRUD consentono di passare, come ultimo parametro, un oggetto `AxiosRequestConfig` per modificare il comportamento della chiamata.
:::

La definizione di AxiosRequestConfig è disponibile [sul sito di Axios](https://axios-http.com/docs/req_config)
