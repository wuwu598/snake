#include<easyx.h>
#include<stdio.h>
#include<conio.h>
#include<time.h>
#define NODE_WIDTH 40
enum direction
{
	eUp,
	eDown,
	eLeft,
	eRight
};
typedef struct
{
	int x;
	int y;
}node;
void paintGrid()
{
	for (int x = 0; x <= 800; x = x + NODE_WIDTH)
		line(x, 0, x, 600);
	for (int y = 0; y <= 600; y = y + NODE_WIDTH)
		line(0, y, 800, y);
}
void paintSnake(node* snake, int n)
{
	for (int i = 0; i < n; i++)
	{
		solidrectangle(snake[i].x * NODE_WIDTH, snake[i].y * NODE_WIDTH, (snake[i].x + 1) * NODE_WIDTH, (snake[i].y + 1) * NODE_WIDTH);
	}
}
node snakeMove(node* snake, int length, int direction)
{
	node tail = snake[length - 1];
	for (int i = length - 1; i > 0; i--)
		snake[i] = snake[i - 1];
	node newHead;
	newHead = snake[0];
	if (direction == eUp)
		newHead.y--;
	else if (direction == eDown)
		newHead.y++;
	else if (direction == eLeft)
		newHead.x--;
	else
		newHead.x++;
	snake[0] = newHead;
	return tail;
}
void changeDrection(enum direction* pD)
{
	if (_kbhit() != 0)
	{
		switch (_getch())
		{
		case 'w':
			if (*pD != eDown)
				*pD = eUp;
			break;
		case 's':
			if (*pD != eUp)
				*pD = eDown;
			break;
		case 'a':
			if (*pD != eRight)
				*pD = eLeft;
			break;
		case 'd':
			if (*pD != eLeft)
				*pD = eRight;
			break;
		}

	}
}
void paintFood(node food)
{
	setfillcolor(YELLOW);
	solidrectangle(food.x * NODE_WIDTH, food.y * NODE_WIDTH, (food.x + 1) * NODE_WIDTH, (food.y + 1) * NODE_WIDTH);
	setfillcolor(WHITE);
}
node createFood(node* snake, int length)
{
	node food;
	while (1)
	{
		food.x = rand() % (800 / NODE_WIDTH);
		food.y = rand() % (600 / NODE_WIDTH);
		int i;
		for (i = 0; i < length; i++)
		{
			if (snake[i].x == food.x && snake[i].y == food.y)
				break;
			if (i < length)
				continue;
			else
				break;
		}
		return food;
	}
}
bool isGameOver(node* snake, int length)
{
	if (snake[0].x < 0 || snake[0].x>800 / NODE_WIDTH)
		return true;
	if (snake[0].y < 0 || snake[0].y>600 / NODE_WIDTH)
		return true;
	for (int i = 1; i < length; i++)
	{
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
			return true;
	}
	return false;
}
int main()
{
	char c[100];
	int a = 500;
	printf("请输入你的名字首字母");
	scanf_s("%s", c, 100);
	if (c[0] == 'c' && c[1] == 'y' && c[2] == 'q')
	{
		printf("系统检测到你是大聪明 ，将适当增加游戏难度\nwsad控制上，下，左，右\n按enter开始\n");
		a = 50;
	}
	getchar();
	getchar();
	initgraph(800, 600);
	setbkcolor(RGB(66, 225, 200));
	cleardevice();
	node snake[98] = { {5,7},{4,7},{3,7},{2,7},{1,7} };
	int length = 5;
	enum direction d = eRight;
	srand(unsigned int(time(NULL)));
	node food = createFood(snake, length);
	while (1)
	{
		cleardevice();
		paintGrid();
		paintSnake(snake, length);
		paintFood(food);
		Sleep(a);
		changeDrection(&d);
		snakeMove(snake, length, d);
		node lastTail = snakeMove(snake, length, d);
		if (snake[0].x == food.x && snake[0].y == food.y)
		{
			if (length < 100)
			{
				snake[length] = lastTail;
				length++;
			}
			food = createFood(snake, length);
		}
		if (isGameOver(snake, length) == true)
		{
			printf("\n\n\nG A M E    O V E R");
			break;
		}
	}
	//getchar();
	closegraph();
	return 0;
}