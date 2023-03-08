// 在您的HTML文件中引入以下JavaScript文件，以便使用OpenAI API
<script src="https://cdn.jsdelivr.net/npm/@openai/api@0.4.4/dist/web.min.js"></script>

// 使用以下代码初始化OpenAI API
const openai = new OpenAI(apiKey);

// 在页面中创建一个表单，以便用户可以输入问题
<form id="question-form">
  <label for="question">请输入您的问题：</label>
  <input type="text" id="question" name="question">
  <button type="submit">提交</button>
</form>

// 使用以下代码在页面中创建一个<div>元素，以便回答用户的问题
<div id="answer"></div>

// 使用以下代码监听用户提交问题的事件，并使用OpenAI API回答问题
document.getElementById("question-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // 防止表单提交刷新页面

  const question = document.getElementById("question").value;
  const prompt = `Q: ${question}\nA:`;

  try {
    const completions = await openai.completions.create({
      engine: 'davinci',
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: ['\n']
    });
    const answer = completions.choices[0].text.trim();
    document.getElementById("answer").innerHTML = answer;
  } catch (err) {
    console.error(err);
  }
});
