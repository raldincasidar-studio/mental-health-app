<template>

            <div class="chat my-chat">
                <!-- <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
                <div class="preview-image" v-show="false" style="background-image: url('https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png')">
                    <v-btn depressed fab color="rgb(0,0,0,0.2)">
                        <v-icon color="white">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="chat my-chat">
                <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
            </div>
            
            <div class="timestamp text-center text-overline grey--text">
                5:13 AM
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3" style="opacity: 0; pointer-events: none">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <div class="chatcontent grey lighten-2 black--text">
                    Hello! i missed you po
                </div>
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <!-- <div class="chatcontent grey lighten-2 black--text">
                    Hello! potangina mo ka
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>

            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <!-- <div class="chatcontent grey lighten-2 black--text">
                    Hello! potangina mo ka
                </div> -->
                <!-- FILE -->
                <div class="chatcontent file grey lighten-2 black--text">
                    <v-list class="pa-0 transparent">
                        <v-list-item class="pa-0 transparent">
                            <v-list-item-avatar>
                                <v-icon
                                    class="grey lighten-1"
                                    dark
                                >
                                    mdi-file-download
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Oten.png</v-list-item-title>
                                <v-list-item-subtitle>1.57 MB</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->

            </div>

            <div class="chat my-chat">
                <!-- <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
            </div>
            <div class="chat my-chat">
                <div class="chatcontent file primary white--text">
                    <v-list class="pa-0 transparent">
                        <v-list-item class="pa-0 transparent">
                            <v-list-item-avatar>
                                <v-icon
                                    class="primary darken-1"
                                    dark
                                >
                                    mdi-file-download
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="white--text">Oten.png</v-list-item-title>
                                <v-list-item-subtitle class="primary--text text--lighten-2">1.57 MB</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <div class="chatcontent file grey lighten-2 black--text">
                    <div class="text-center my-4" style="width: 100%">
                        <v-btn fab depressed color="grey lighten-1" class="mb-3" size="40" v-ripple="false">
                            <v-icon color="white">
                                mdi-link-variant
                            </v-icon>
                        </v-btn>
                        <h3 class="my-1" style="font-weight: lighter">Anxiety Test Result</h3>
                        <h5 class="my-1" style="font-weight: bold">Kate Rachel B. Velasco</h5>
                        <p>50% Positive</p>
                    </div>
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
            </div>

</template>