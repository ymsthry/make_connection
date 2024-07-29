async function getChatGPTResponse() {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');

    // OpenAI APIキーを設定（これを本番環境では公開しないように注意）
    const apiKey = 'YOUR_OPENAI_API_KEY';

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        responseDiv.innerText = data.choices[0].text;
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
}
