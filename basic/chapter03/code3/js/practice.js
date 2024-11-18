let myTags, len

// p 태그.
// console.log('\np 태그:')
// myTags = $('p')
// len = myTags.length                        
// for (let i=0; i <len; i++){            
//      console.log( $(`p:eq(${i})`).text())
// }

// p 태그
// console.log(`p tag`);
// myTags = $('p');
// len = myTags.length;
// for (let i=0; i<len; i++) {
//     console.log($(`p:eq(${i})`).text())
// }


// span 태그.
// console.log('\nspan 태그:')
// myTags = $('span')
// len = myTags.length
// for (let i=0; i <len; i++){            
//     console.log( $(`span:eq(${i})`).text())
// }
// console.log(`span tag`);
// myTags = $('span');
// len = myTags.length;
// for (let i=0; i<len; i++) {
//     console.log($(`span:eq(${i})`).text())
// }

// li 태그.
// console.log('\nli 태그:')
// myTags = $('li')
// len = myTags.length
// for (let i=0; i <len; i++){            
//     console.log( $(`li:eq(${i})`).text())
// }

// li 태그.
console.log(`li tag`);
myTags = $('li');
len = myTags.length;
for (let i=0; i<len; i++) {
    console.log($(`li:eq(${i})`).text())
}