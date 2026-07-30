async function testEndpoints() {
  const baseUrl = 'http://localhost:3000/api';
  console.log('Starting E2E verification...');

  try {
    // 1. Register a user
    console.log('1. Registering user...');
    const registerRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'E2E User',
        email: `e2e_${Date.now()}@example.com`,
        password: 'password123',
        role: 'customer'
      })
    });
    const registerData = await registerRes.json();
    if (!registerRes.ok) throw new Error(`Register failed: ${JSON.stringify(registerData)}`);
    console.log('User registered successfully');

    // 2. Login
    console.log('\n2. Logging in...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: registerData.email,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    const token = loginData.token;
    console.log('Login successful');

    // 3. Browse Categories
    console.log('\n3. Browsing categories...');
    const catRes = await fetch(`${baseUrl}/categories`);
    if (!catRes.ok) throw new Error(`Categories failed: ${await catRes.text()}`);
    console.log('Categories fetched');

    // 4. Browse Products
    console.log('\n4. Browsing products...');
    const prodRes = await fetch(`${baseUrl}/products`);
    if (!prodRes.ok) throw new Error(`Products failed: ${await prodRes.text()}`);
    console.log('Products fetched');

    // 5. Add to Cart
    console.log('\n5. Fetching Cart...');
    const cartRes = await fetch(`${baseUrl}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!cartRes.ok) throw new Error(`Cart failed: ${await cartRes.text()}`);
    console.log('Cart fetched successfully');

    // 6. User Profile
    console.log('\n6. Fetching User Profile...');
    const profRes = await fetch(`${baseUrl}/users/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!profRes.ok) throw new Error(`Profile failed: ${await profRes.text()}`);
    console.log('Profile fetched successfully');

    console.log('\n✅ All endpoints verified successfully!');
  } catch (error) {
    console.error('\n❌ E2E Verification failed:', error.message);
    process.exit(1);
  }
}

testEndpoints();
