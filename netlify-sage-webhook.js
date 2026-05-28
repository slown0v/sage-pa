const crypto = require('crypto');

exports.handler = async (event) => {
  try {
    const code = event.queryStringParameters?.code;
    const secret = "KCCkn46LbwpkKuD_jKL4uXi0GdQR1GU0r2Yw-TlTrbKHP6jS9uPduXy-_LGvQ0zT";

    if (!code) {
      return {
        statusCode: 400,
        body: 'Code parameter missing'
      };
    }

    // Créer la signature HMACSHA256
    const signature = crypto
      .createHmac('sha256', secret)
      .update(code)
      .digest('hex');

    return {
      statusCode: 200,
      body: signature,
      headers: {
        'Content-Type': 'text/plain'
      }
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Error: ' + error.message
    };
  }
};
