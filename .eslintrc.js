module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs', // 'plugin:prettier/recommended', 
    'plugin:vue/recommended'

  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "space-before-function-paren": "off",
    "vue/name-property-casing": "off", 
    "vue/order-in-components": "off", 
    "vue/attributes-order": "off", 
    "vue/html-self-closing": "off", 
    "vue/max-attributes-per-line": "off", 
    "vue/no-side-effects-in-computed-properties": "off", 
    "vue/no-unused-components": "off", 
    "vue/no-v-html": "off", 
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', 
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', 
    "dot-notation": "off", 
    "no-multi-spaces": "off", 
    "semi": "off", 
    "quotes": "off", 
    "quote-props": "off", 
    "comma-dangle": "off", 
    "camelcase": "off", 
    "eslint-disable-next-line": "off", 
    "no-trailing-spaces": 'off', 
    "no-useless-catch": 'off', 
    'vue/singleline-html-element-content-newline': 'off', 
    'vue/multiline-html-element-content-newline': 'off', 
    'no-prototype-builtins': 'off', 
    'no-unused-vars': 'off',
    'padded-blocks': 'off',
    'no-irregular-whitespace': 'off',
    'vue/no-unused-vars': 'off'
  }
};
