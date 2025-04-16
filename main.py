import pygame
import math

# Constantes
WIDTH, HEIGHT = 780, 780
VISION_RADIUS = 85
CAMERA_SPEED = 10
WARD_RADIUS = 10
ZOOM_MIN = 0.5
ZOOM_MAX = 2.0
ZOOM_STEP = 0.1

# Initialisation
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)
pygame.display.set_caption("Simulateur de vision - LoL")

map_image = pygame.image.load("img/map.png").convert()
map_rect = map_image.get_rect()
collision_map = pygame.image.load("img/mur.png").convert()
directions = [(math.cos(math.radians(a)), math.sin(math.radians(a))) for a in range(360)]

wards = []
camera_x, camera_y = 0, 0
zoom_level = 1.0

def distance(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])

def update_camera(keys):
    global camera_x, camera_y
    if keys[pygame.K_LEFT] or keys[pygame.K_q]:
        camera_x = max(camera_x - CAMERA_SPEED, 0)
    if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
        camera_x = min(camera_x + CAMERA_SPEED, int(map_rect.width * zoom_level) - WIDTH)
    if keys[pygame.K_UP] or keys[pygame.K_z]:
        camera_y = max(camera_y - CAMERA_SPEED, 0)
    if keys[pygame.K_DOWN] or keys[pygame.K_s]:
        camera_y = min(camera_y + CAMERA_SPEED, int(map_rect.height * zoom_level) - HEIGHT)

def handle_events():
    global running, WIDTH, HEIGHT, screen, zoom_level, camera_x, camera_y
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            return False
        if event.type == pygame.VIDEORESIZE:
            WIDTH, HEIGHT = event.w, event.h
            screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)
        if event.type == pygame.MOUSEWHEEL:
            mouse_zoom(event.y)
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            handle_mouse_click()
    return True

def mouse_zoom(direction):
    global zoom_level, camera_x, camera_y
    old_zoom = zoom_level
    zoom_level += direction * ZOOM_STEP
    zoom_level = max(ZOOM_MIN, min(ZOOM_MAX, zoom_level))

    mx, my = pygame.mouse.get_pos()
    camera_x = int((camera_x + mx) / old_zoom * zoom_level - mx)
    camera_y = int((camera_y + my) / old_zoom * zoom_level - my)

    camera_x = max(0, min(camera_x, int(map_rect.width * zoom_level) - WIDTH))
    camera_y = max(0, min(camera_y, int(map_rect.height * zoom_level) - HEIGHT))

def handle_mouse_click():
    mx, my = pygame.mouse.get_pos()
    world_pos = ((mx + camera_x) / zoom_level, (my + camera_y) / zoom_level)
    for ward in wards:
        if distance(ward, world_pos) <= WARD_RADIUS:
            wards.remove(ward)
            return
    wards.append(world_pos)

def draw_scene():
    screen.fill((0, 0, 0))
    draw_map()
    draw_wards()
    pygame.display.flip()

def draw_map():
    zoomed_map = pygame.transform.smoothscale(
        map_image, (int(map_rect.width * zoom_level), int(map_rect.height * zoom_level))
    )
    screen.blit(zoomed_map, (0, 0), area=pygame.Rect(camera_x, camera_y, WIDTH, HEIGHT))

def draw_wards():
    for ward_pos in wards:
        screen_x = int((ward_pos[0] * zoom_level) - camera_x)
        screen_y = int((ward_pos[1] * zoom_level) - camera_y)
        pygame.draw.circle(screen, (0, 255, 0), (screen_x, screen_y), 5)
        draw_vision_with_walls(ward_pos)

def draw_vision_with_walls(ward_world_pos):
    vision_mask = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)

    for dx_cos, dy_sin in directions:
        c, dans = 0, False
        for i in range(VISION_RADIUS):
            dx = int(ward_world_pos[0] + i * dx_cos)
            dy = int(ward_world_pos[1] + i * dy_sin)

            if 0 <= dx < collision_map.get_width() and 0 <= dy < collision_map.get_height():
                color = collision_map.get_at((dx, dy))
                c += 1

                if color.r < 50 and color.g < 50 and color.b < 50:
                    break
                elif color.r < 50 and color.g > 225 and color.b < 50:
                    if not dans and c < 5:
                        dans = True
                    elif not dans:
                        break

                screen_x = int((dx * zoom_level) - camera_x)
                screen_y = int((dy * zoom_level) - camera_y)
                if 0 <= screen_x < WIDTH and 0 <= screen_y < HEIGHT:
                    vision_mask.set_at((screen_x, screen_y), (255, 255, 0, 60))
            else:
                break

    screen.blit(vision_mask, (0, 0))

def main():
    global running
    running = True
    clock = pygame.time.Clock()

    while running:
        running = handle_events()
        update_camera(pygame.key.get_pressed())
        draw_scene()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()