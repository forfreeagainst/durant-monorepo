const express = require("express");
const bodyParser = require('body-parser')
//引入外部模块
const clockIn = require("./routes/clockIn.js")

const app = express()

//配置第三方中间件获取post提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置外部路由模块
app.use("/clockIn", clockIn)

app.get('/', (req, res) => {
    res.send('服务启动完成')
})

//监听端口  端口号建议写成3000以上
// http://localhost:3456/clockIn
// http://localhost:3456/clockIn/clockInA/add
app.listen(3456);