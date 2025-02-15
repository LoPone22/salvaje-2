export const theme = {
  colors: {
    brown: [
      '#F5E6D3',
      '#E6D5C1',
      '#D6C4AF',
      '#C7B39D',
      '#B8A28B',
      '#A99179',
      '#998067',
      '#8A6F55',
      '#7B5E43',
      '#6C4D31'
    ]
  },
  primaryColor: 'brown',
  components: {
    Button: {
      defaultProps: {
        color: 'brown'
      }
    },
    AppShell: {
      styles: {
        main: {
          background: '#F5E6D3'
        }
      }
    }
  }
}
