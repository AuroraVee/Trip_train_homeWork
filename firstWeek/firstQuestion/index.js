
function process () {
    let tdList = document.getElementsByClassName("content")
    let flag = 0

    for (let i = 0; i < tdList.length; i++) {
        tdList[i].onclick = function () {
            if (flag === 0) {//上一次的结果
                flag = 1
                this.classList.add("X")
                this.innerText = "X"
            } else {
                flag = 0
                this.classList.add("O")
                this.innerText = "O"
            }

            this.onclick = null //避免重复触发，点击一次后该格子不能再触发
        }
    }

}

process()