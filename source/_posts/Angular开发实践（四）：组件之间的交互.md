---
title: Angular开发实践（四）：组件之间的交互
date: 2018-03-24 15:30:30
tags:
- Angular
- JavaScript
categories: Angular
---

在Angular应用开发中，组件可以说是随处可见的。本篇文章将介绍几种常见的组件通讯场景，也就是让两个或多个组件之间交互的方法。

根据数据的传递方向，分为**父组件向子组件传递**、**子组件向父组件传递**及**通过服务传递**三种交互方法。

## 父组件向子组件传递

子组件通过[@Input装饰器](https://angular.cn/guide/template-syntax#inputs-outputs)定义**输入属性**，然后父组件在引用子组件的时候通过这些输入属性向子组件传递数据，子组件可通过`setter`或`ngOnChanges()`来截听输入属性值的变化。

先定义两个组件，分别为`子组件DemoChildComponent`和`父组件DemoParentComponent`.

子组件：

```javascript
@Component({
  selector: 'demo-child',
  template: `
    <p>{{paramOne}}</p>
    <p>{{paramTwo}}</p>
  `
})
export class DemoChildComponent {
    @Input() paramOne: any; // 输入属性1
    @Input() paramTwo: any; // 输入属性2
}
```

子组件通过`@Input()`定义输入属性`paramOne`和`paramTwo`（属性值可以为任意数据类型）

父组件：

```javascript
@Component({
  selector: 'demo-parent',
  template: `
    <demo-child [paramOne]='paramOneVal' [paramTwo]='paramTwoVal'></demo-child>
  `
})
export class DemoParentComponent {
    paramOneVal: any = '传递给paramOne的数据';
    paramTwoVal: any = '传递给paramTwo的数据';
}
```

父组件在其模板中通过选择器`demo-child`引用`子组件DemoChildComponent`，并通过子组件的两个输入属性`paramOne`和`paramTwo`向子组件传递数据，最后在子组件的模板中就显示`传递给paramOne的数据`和`传递给paramTwo的数据`这两行文本。

#### 通过 setter 截听输入属性值的变化

在实际应用中，我们往往需要在某个输入属性值发生变化的时候做相应的操作，那么此时我们需要用到输入属性的 setter 来截听输入属性值的变化。

我们将`子组件DemoChildComponent`进行如下改造：

```javascript
@Component({
  selector: 'demo-child',
  template: `
    <p>{{paramOneVal}}</p>
    <p>{{paramTwo}}</p>
  `
})
export class DemoChildComponent {
    private paramOneVal: any;

    @Input()
    set paramOne (val: any) { // 输入属性1
        this.paramOneVal = val;
        // dosomething
    };
    get paramOne () {
        return this.paramOneVal;
    };

    @Input() paramTwo: any; // 输入属性2
}
```

在上面的代码中，我们可以看到通过`paramOne`属性的 setter 将拦截到的值`val`赋值给内部私有属性`paramOneVal`，达到父组件传递数据给子组件的效果。当然，最重要的是，在 setter 里面你可以做更多的其它操作，程序的灵活性就更强了。

#### 通过ngOnChanges()来截听输入属性值的变化

`通过 setter 截听输入属性值的变化`的方法只能对单个属性值变化进行监视，如果需要监视多个、交互式输入属性的时候，这种方法就显得力不从心了。而通过使用 OnChanges 生命周期钩子接口的 ngOnChanges() 方法（当组件通过`@Input`装饰器显式指定的那些变量的值变化时调用）就可以实现同时监视多个输入属性值的变化。

在`子组件DemoChildComponent`新增`ngOnChanges`：


```javascript
@Component({
  selector: 'demo-child',
  template: `
    <p>{{paramOneVal}}</p>
    <p>{{paramTwo}}</p>
  `
})
export class DemoChildComponent implements OnChanges {
    private paramOneVal: any;

    @Input()
    set paramOne (val: any) { // 输入属性1
        this.paramOneVal = val;
        // dosomething
    };
    get paramOne () {
        return this.paramOneVal;
    };

    @Input() paramTwo: any; // 输入属性2

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) { // 遍历changes
            let changedProp = changes[propName]; // propName是输入属性的变量名称
            let to = JSON.stringify(changedProp.currentValue); // 获取输入属性当前值
            if (changedProp.isFirstChange()) { // 判断输入属性是否首次变化
                console.log(`Initial value of ${propName} set to ${to}`);
            } else {
                let from = JSON.stringify(changedProp.previousValue); // 获取输入属性先前值
                console.log(`${propName} changed from ${from} to ${to}`);
            }
        }
    }
}
```

新增的`ngOnChanges`方法接收的参数`changes`是以输入属性名称为键、值为`SimpleChange`的对象，[SimpleChange](https://angular.cn/api/core/SimpleChange)对象含有当前输入属性是否第一次变化、先前值、当前值等属性。因此在`ngOnChanges`方法中通过遍历`changes`对象可监视多个输入属性值并进行相应的操作。

#### 获取父组件实例

前面介绍的都是子组件通过`@Input装饰器`定义输入属性，这样父组件可通过输入属性将数据传递给子组件。

当然，我们可以想到一种更主动的方法，那就是获取到父组件实例，然后调用父组件的某个属性或方法来获取需要的数据。**考虑到每个组件的实例都会添加到注入器的容器里，因此可通过[依赖注入](https://angular.cn/guide/dependency-injection)来找到父组件的示例**。

`子组件获取父组件实例`相比于`父组件获取子组件实例`（直接通过`模板变量`、`@ViewChild`或`@ViewChildren`获取）要麻烦一些。

要在子组件中获取父组件的实例，有两种情况：

- 已知父组件的类型

    这种情况可以直接通过在构造函数中注入DemoParentComponent来获取已知类型的父组件引用，代码示例如下：

    ```javascript
    @Component({
      selector: 'demo-child',
      template: `
        <p>{{paramOne}}</p>
        <p>{{paramTwo}}</p>
      `
    })
    export class DemoChildComponent {
        paramOne: any;
        paramTwo: any;

        constructor(public demoParent: DemoParentComponent) {

            // 通过父组件实例demoParent获取数据
            this.paramOne = demoParent.paramOneVal;
            this.paramTwo = demoParent.paramTwoVal;
        }
    }
    ```

- 未知父组件的类型

    一个组件可能是多个组件的子组件，有时候无法直接知道父组件的类型，在Angular中，可通过`类—接口（Class-Interface）`的方式来查找，即让父组件通过提供一个与`类—接口`标识同名的别名来协助查找。

    首先创建DemoParent抽象类，它只声明了`paramOneVal`和`paramTwoVal`属性，没有实现（赋值），示例代码如下：

    ```javascript
    export abstract class DemoParent {
        paramOneVal: any;
        paramTwoVal: any;
    }
    ```

    然后在`父组件DemoParentComponent`的`providers`元数据中定义一个别名 Provider，用 useExisting 来注入父组件DemoParentComponent的实例，代码示例如下：

    ```javascript
    @Component({
      selector: 'demo-parent',
      template: `
        <demo-child [paramOne]='paramOneVal' [paramTwo]='paramTwoVal'></demo-child>
      `,
      providers: [{provider: DemoParent, useExisting: DemoParentComponent}]
    })
    export class DemoParentComponent implements DemoParent {
        paramOneVal: any = '传递给paramOne的数据';
        paramTwoVal: any = '传递给paramTwo的数据';
    }
    ```

    然后在子组件中就可通过DemoParent这个标识找到父组件的示例了，示例代码如下：

    ```javascript
    @Component({
      selector: 'demo-child',
      template: `
        <p>{{paramOne}}</p>
        <p>{{paramTwo}}</p>
      `
    })
    export class DemoChildComponent {
        paramOne: any;
        paramTwo: any;

        constructor(public demoParent: DemoParent) {

            // 通过父组件实例demoParent获取数据
            this.paramOne = demoParent.paramOneVal;
            this.paramTwo = demoParent.paramTwoVal;
        }
    }
    ```

## 子组件向父组件传递

依然先定义两个组件，分别为`子组件DemoChildComponent`和`父组件DemoParentComponent`.

子组件：

```javascript
@Component({
  selector: 'demo-child',
  template: `
    <p>子组件DemoChildComponent</p>
  `
})
export class DemoChildComponent implements OnInit {
    readyInfo: string = '子组件DemoChildComponent初始化完成！';
    @Output() ready: EventEmitter = new EventEmitter<any>(); // 输出属性

    ngOnInit() {
        this.ready.emit(this.readyInfo);
    }
}
```

父组件：

```javascript
@Component({
  selector: 'demo-parent',
  template: `
    <demo-child (ready)="onReady($event)" #demoChild></demo-child>
    <p>
        <!-- 通过本地变量获取readyInfo属性，显示：子组件DemoChildComponent初始化完成！ -->
        readyInfo: {{demoChild.readyInfo}}
    </p>
    <p>
        <!-- 通过组件类获取子组件示例，然后获取readyInfo属性，显示：子组件DemoChildComponent初始化完成！ -->
        readyInfo: {{demoChildComponent.readyInfo}}
    </p>
  `
})
export class DemoParentComponent implements AfterViewInit {
    // @ViewChild('demoChild') demoChildComponent: DemoChildComponent; // 通过模板别名获取
    @ViewChild(DemoChildComponent) demoChildComponent: DemoChildComponent; // 通过组件类型获取

    ngAfterViewInit() {
        console.log(this.demoChildComponent.readyInfo); // 打印结果：子组件DemoChildComponent初始化完成！
    }

    onReady(evt: any) {
        console.log(evt); // 打印结果：子组件DemoChildComponent初始化完成！
    }
}
```

#### 父组件监听子组件的事件

子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应。

在上面定义好的子组件和父组件，我们可以看到：

子组件通过`@Output()`定义输出属性`ready`，然后在ngOnInit中利用ready属性的 emits(向上弹射)事件。

父组件在其模板中通过选择器`demo-child`引用`子组件DemoChildComponent`，并绑定了一个事件处理器(onReady())，用来响应子组件的事件($event)并打印出数据（onReady($event)中的$event是固定写法，框架(Angular)把事件参数(用 $event 表示)传给事件处理方法）。

#### 父组件与子组件通过本地变量（模板变量）互动

父组件不能使用数据绑定来读取子组件的属性或调用子组件的方法。但可以在父组件模板里，新建一个本地变量来代表子组件，然后利用这个变量来读取子组件的属性和调用子组件的方法。

在上面定义好的子组件和父组件，我们可以看到：

父组件在模板`demo-child`标签上定义了一个`demoChild`本地变量，然后在模板中获取子组件的属性：

```html
<p>
    <!-- 获取子组件的属性readyInfo，显示：子组件DemoChildComponent初始化完成！ -->
    readyInfo: {{demoChild.readyInfo}}
</p>
```

#### 父组件调用@ViewChild()

本地变量方法是个简单便利的方法。但是它也有局限性，因为父组件-子组件的连接必须全部在父组件的模板中进行。父组件本身的代码对子组件没有访问权。

如果父组件的类需要读取子组件的属性值或调用子组件的方法，就不能使用本地变量方法。

当父组件类需要这种访问时，可以把子组件作为 ViewChild，注入到父组件里面。

在上面定义好的子组件和父组件，我们可以看到：

父组件在组件类中通过`@ViewChild()`获取到子组件的实例，然后就可以在模板或者组件类中通过该实例获取子组件的属性：

```html
<p>
    <!-- 通过组件类获取子组件示例，然后获取readyInfo属性，显示：子组件DemoChildComponent初始化完成！ -->
    readyInfo: {{demoChildComponent.readyInfo}}
</p>
```

```javascript
ngAfterViewInit() {
    console.log(this.demoChildComponent.readyInfo); // 打印结果：子组件DemoChildComponent初始化完成！
}
```

## 通过服务传递

Angular的服务可以在模块注入或者组件注入（均通过`providers`注入）。

在模块中注入的服务在整个Angular应用都可以访问（除[惰性加载的模块](https://angular.cn/guide/lazy-loading-ngmodules)）。

在组件中注入的服务就只能该组件和其子组件进行访问，这个组件子树之外的组件将无法访问该服务或者与它们通讯。

下面的示例就以在组件中注入的服务来进行父子组件之间的数据传递：

通讯的服务：

```javascript
@Injectable()
export class CallService {
    info: string = '我是CallService的info';
}
```

父组件：

```javascript
@Component({
  selector: 'demo-parent',
  template: `
    <demo-child></demo-child>
    <button (click)="changeInfo()">父组件改变info</button>
    <p>
        <!-- 显示：我是CallService的info -->
        {{callService.info}}
    </p>
  `,
  providers: [CallService]
})
export class DemoParentComponent {
    constructor(public callService: CallService) {
      console.log(callService.info); // 打印结果：我是CallService的info
    }

    changeInfo() {
        this.callService.info = '我是被父组件改变的CallService的info';
    }
}
```

子组件：

```javascript
@Component({
  selector: 'demo-child',
  template: `
    <button (click)="changeInfo()">子组件改变info</button>
  `
})
export class DemoChildComponent {
    constructor(public callService: CallService) {
        console.log(callService.info); // 打印结果：我是CallService的info
    }

    changeInfo() {
        this.callService.info = '我是被子组件改变的CallService的info';
    }
}
```

上面的代码中，我们定义了一个CallService服务，在其内定义了info属性，后面将分别在父子组件通过修改这个属性的值达到父子组件互相传递数据的目的。

然后通过DemoParentComponent的`providers`元数据数组提供CallService服务的实例，并通过构造函数分别注入到父子组件中。

此时，通过`父组件改变info按钮`或`子组件改变info按钮`在父组件或子组件中改变CallService服务的info属性值，然后在页面可看到改变之后对应的info属性值。
