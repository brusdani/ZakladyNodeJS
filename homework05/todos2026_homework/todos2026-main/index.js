import {Hono} from 'hono'
import {serve} from '@hono/node-server'
import ejs from 'ejs'

const app = new Hono()

let todos = [
    {
        id: 1,
        title: 'Zajít na pivo',
        done: true,
    },
    {
        id: 2,
        title: 'Jít učit Node.js',
        done: false,
    },
]

app.get(async (c, next) => {
    console.log(c.req.method, c.req.url)

    await next()
})

app.get('/', async (c) => {
    const html = await ejs.renderFile('views/index.html', {
        name: 'Todos',
        todos,
    })

    return c.html(html)
})

app.post('/add-todo', async (c) => {
    const body = await c.req.formData()
    const title = body.get('title')

    todos.push({
        id: todos.length + 1,
        title,
        done: false,
    })

    return c.redirect('/')
})

app.get('/remove-todo/:id', async (c) => {
    const id = Number(c.req.param('id'))

    todos = todos.filter((todo) => todo.id !== id)

    return c.redirect('/')
})

app.get('/toggle-todo/:id', async (c) => {
    const id = Number(c.req.param('id'))

    const todo = todos.find((todo) => todo.id === id)
    todo.done = !todo.done

    const backUrl = c.req.header('Referer')

    return c.redirect(backUrl || '/')
})

app.notFound(async (c) => {
    const html = await ejs.renderFile('views/404.html')

    c.status(404)

    return c.html(html)
})

//Homework 05 part
app.get('/todo/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const todo = todos.find((t) => t.id === id)

    if (!todo) {
        return c.redirect('/')
    }
    const html = await ejs.renderFile('views/detail.html', {
        todo,
    })

    return c.html(html)
})

app.post('/update-todo/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.formData()
    const newTitle = body.get('title')?.toString().trim()

    //Pretending to do some user's input validation
    if (!newTitle || newTitle.length === 0) {
        return c.redirect(`/todo/${id}`)
    }
    if (newTitle.length > 100) {
        return c.text("Title is too long (max 100 chars) ", 400)
    }

    const todo = todos.find((t) => t.id === id)
    if (todo) {
        todo.title = newTitle
    }

    return c.redirect(`/todo/${id}`)
})

serve(app, (info) => {
    console.log(`Server started on http://localhost:${info.port}`)
})
