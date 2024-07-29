async function getChatGPTResponse() {
    const userInput = document.getElementById('user-input').value;
    const responseDiv = document.getElementById('response');
    const style = document.getElementById('style').value;

    // 正しい形式でAPIキーを設定
    const apiKey = 'sk-None-2PJlq4okAaElfmL1Wx0NT3BlbkFJeNWfZtXaDyUx2dWXzyWK'; // 実際のAPIキーに置き換えてください

    // スタイルに応じたプロンプトを設定
    let prompt;
    if (style === 'friend') {
        prompt = `友人のように親身になって優しく、次の内容について返答してください: ${userInput}`;
    } else if (style === 'parent') {
        prompt = `将来を心配する親のように厳しく、次の内容について返答してください: ${userInput}`;
    } else if (style === 'teacher') {
        prompt = `先生のように中立的な立場で、次の内容について返答してください: ${userInput}`;
    } else {
        responseDiv.innerText = 'Error: Invalid style selected.';
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.innerText = data.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerText = 'Error: ' + error.message;
    }
}
