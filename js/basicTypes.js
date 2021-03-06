(function()
{
    var Point2D = function(x, y)
    {
        this.x = x;
        this.y = y;
    };

    Point2D.toIsometric = function(point)
    {
        return new Point2D((point.x - point.y), ((point.x + point.y) / 2));
    };

    Point2D.to2D = function(point)
    {
        return new Point2D(((2 * point.y + point.x) / 2), ((2 * point.y - point.x) / 2));
    };

    Point2D.getDirection = function(point)
    {
        if(point.x == 0 && point.y == -1)
        {
            return "N";
        }
        else if(point.x == 1 && point.y == -1)
        {
            return "NE";
        }
        else if(point.x == 1 && point.y == 0)
        {
            return "E";
        }
        else if(point.x == 1 && point.y == 1)
        {
            return "SE";
        }
        else if(point.x == 0 && point.y == 1)
        {
            return "S";
        }
        else if(point.x == -1 && point.y == 1)
        {
            return "SW";
        }
        else if(point.x == -1 && point.y == 0)
        {
            return "W";
        }
        else if(point.x == -1 && point.y == -1)
        {
            return "NW";
        }

        return "E";
    };

    Point2D.directionToPoint3D = function(direction)
    {
        if(direction == "N")
        {
            return new Point3D(0, -1, 0);
        }
        else if(direction == "NE")
        {
            return new Point3D(1, -1, 0);
        }
        else if(direction == "E")
        {
            return new Point3D(1, 0, 0);
        }
        else if(direction == "SE")
        {
            return new Point3D(1, 1, 0);
        }
        else if(direction == "S")
        {
            return new Point3D(0, 1, 0);
        }
        else if(direction == "SW")
        {
            return new Point3D(-1, 1, 0);
        }
        else if(direction == "W")
        {
            return new Point3D(-1, 0, 0);
        }
        else if(direction == "NW")
        {
            return new Point3D(-1, -1, 0);
        }

        return new new Point3D(1, 0, 0);
    };

    var Point3D = function(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z ? z : 0;
    };

    Point3D.toIsometric = function(point)
    {
        return new Point2D((point.x - point.y), (((point.x + point.y) / 2) + (point.z ? point.z : 0)));
    };

    Point3D.translate = function(point, vector)
    {
        if(vector)
        {
            return new Point3D(point.x + vector.x, point.y + vector.y, point.z + vector.z);
        }

        return new Point3D(point.x, point.y, point.z);
    }

    Point3D.AreEqual = function(point1, point2)
    {
        if(point1 && point2)
        {
            return point1.x == point2.x && point1.y == point2.y && point1.z == point2.z;
        }
        else if(point1 && !point2 || !point1 && point2)
        {
            return false;
        }

        /*both are null*/
        return true;
    }

    var ColorRgba = function(r, g, b, a)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a ? a : 0;
    };

    ColorRgba.toCanvasColor = function(c)
    {
        if(this.a)
        {
            return "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")";
        }
        else
        {
            return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
        }
    }

    var TerrainData = function()
    {
        this.tiles = [];
        this.heightMap = [];
        this.tileTypes = {};
    };

    var Polygon = function()
    {
        if(arguments.length)
        {
            for(var i = 0, l = arguments.length; i < l; i++)
            {
                this.push(arguments[i]);
            }
        }
    };
    Polygon.inherits(Array);

    Polygon.method("setTexture", function(texture)
    {
        this.texture = texture;
    });

    Polygon.method("setColor", function(r, g, b, a)
    {
        this.color = new ColorRgba(r, g, b, a);
    });

    var Texture = function(image, offsetX, offsetY)
    {
        this.image = image;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    };

    var Box = function(width, height, altitude)
    {
        this.width = width;
        this.height = height;
        this.altitude = altitude;
    };

    var Rectangle = function(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    var Text = function(text, color)
    {
        this.text = text;
        this.color = color;
        this.solid = true;
        this.offsetX = 0;
        this.offsetY = 0;
    };

    spqr.Basic = {};
    spqr.Basic.Point2D = Point2D;
    spqr.Basic.Point3D = Point3D;
    spqr.Basic.TerrainData = TerrainData;
    spqr.Basic.Polygon = Polygon;
    spqr.Basic.ColorRgba = ColorRgba;
    spqr.Basic.Texture = Texture;
    spqr.Basic.Box = Box;
    spqr.Basic.Rectangle = Rectangle;
    spqr.Basic.Text = Text;
})();
