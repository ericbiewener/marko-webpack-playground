module.exports = {
  Program: {
    enter(path, state) {
      debugger;
      console.log(state.filename)
      console.log('no')
      if (path.node.body.length !== 1) return;
      console.log('yes')
    }
  }
}
