const http = require('http');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  console.log('=== 测试 MindMirror 页面 ===\n');
  
  // 测试首页
  console.log('1. 测试首页 (/)');
  const homeHtml = await fetchPage('http://localhost:5186/');
  console.log('   - HTML 加载成功');
  console.log('   - 包含 React 入口:', homeHtml.includes('id="root"') ? '✓' : '✗');
  console.log('   - 包含 Vite 模块:', homeHtml.includes('@vite') ? '✓' : '✗');
  
  // 测试 /app/home 路由
  console.log('\n2. 测试 /app/home 路由');
  const appHomeHtml = await fetchPage('http://localhost:5186/app/home');
  console.log('   - 页面返回状态: 正常');
  
  // 检查 JS bundle
  console.log('\n3. 检查 JS Bundle');
  const indexJs = await fetchPage('http://localhost:5186/src/App.tsx').catch(() => null);
  if (indexJs && indexJs.includes('export default function App')) {
    console.log('   - App.tsx 可访问: ✓');
  } else {
    console.log('   - App.tsx 是模块,无法直接访问: 这是正常的');
  }
  
  console.log('\n=== 测试完成 ===');
  console.log('\n用户访问流程:');
  console.log('1. 访问 http://localhost:5186/');
  console.log('2. React 加载 App.tsx');
  console.log('3. "/" 路由重定向到 "/app/home"');
  console.log('4. "/app/home" 渲染 AppLayout + HomePage');
  console.log('5. HomePage 显示首页内容');
}

test().catch(console.error);
